/*
 sm.js adds the 'sm' object to the global namespace,
 allowing the developer the following API:
 sm.publish(sig, par)    
 sm.publishLater(sig, par, ms)
 sm.addMachine(m)
 sm.removeMachine(m)

 It also adds the function smEnableTesting(), which
 replace the sm object with a fake object that
 contains features to ease unit testing of state
 machines.
*/

function RepeatCommandDevice() {
	var data = {};
	var repeater = function(sig, par) {
		if(sig === 'command with args finished') {
			data.commandName = par.commandName;
			data.args = par.args;
			sm.transitionTo('CMDWITHARGS');
		}
		if(sig == 'commands reloaded') {
			sm.transitionTo('EMPTY');
		}
	};
	var empty = function(sig) {
		return 'REPEATER';
	};
	var cmdwithargs = function(sig, par) {
		if(sig === 'repeat command') {
			sm.publish('run command with args', data);
		}
		return 'REPEATER';
	};
	var cmdnoargs = function(sig, par) {
		if(sig === 'repeat command') {
			sm.publish('run command without args', data.commandName);
		}
		return 'REPEATER';
	};
	var machine = {
		startState: 'EMPTY',
		states:
		{
		'EMPTY': empty,
		'REPEATER': repeater,
		'CMDWITHARGS': cmdwithargs,
		'CMDNOARGS': cmdnoargs
		}
	}
	return sm.createMachine(machine);
}

describe('ReloadCountdownDevice'), function() {
	beforeEach(function() {
		smEnableTesting();
	}

	it('starts in state READY'), function() {
		var dut = ReloadCountdownDevice();
		expect(dut.state).toBe('READY');
	});

	it('transitions to state LOADING when user hits fire'), function() {
		var dut = ReloadCountdownDevice();
		sm.addMachine(dut);
		sm.publish('fire');
		sm.rtc();
		expect(dut.state).toBe('LOADING');
	}
});

