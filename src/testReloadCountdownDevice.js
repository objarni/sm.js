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

function ReloadCountdownDevice() {
	var ready = function(sig) {
		if(sig === 'fire') {
			sm.publish('create shot');
			sm.transitionTo('LOADING');
		}
	};
	var loading = function(sig) {
		if(sig == '@enter') {
			sm.publishLater('reloaded', 1000);
		}
		if(sig == 'reloaded')
			sm.transitionTo('READY');
	};
	var machine = {
		startState: 'READY',
		states:
		{
		'READY': ready,
		'LOADING': loading
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

