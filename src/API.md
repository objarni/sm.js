Application Programmer Interface
================================

Version: 0.1
------------

_sm_ is short for _State Machine_.


require.js companionship
------------------------
__sm.js__ puts the object __sm__ in the global namespace, unless it detects require.js, in which case it
defines a module named 'sm' for you to use as a dependency in your modules.

Hello world!
------------

This is Hello World using sm.js. It contains a single state machine, which start in the state "NOTCLICKED",
and when the user presses the button, it goes to "CLICKED" and modifies a div to say "hello world".

Index.html:

```html
<html>
<head>
  <script src='sm.js'></script>
  <script src='hello.js'></script>
<head>
<body>
  <div id="myText">Click button!</div>
  <input type=button onClick="sm.publish('click')">
  <script>
    function tick() {
      sm.doEvents();
    }
    setInterval(tick, 10);
    var helloMachine = HelloMachine(document.getElementById("myText");
    sm.addMachine(helloMachine);
  </script>
</body>
</html>
```
  
hello.js:

```javascript
function HelloMachine(div) {
  return sm.createMachine({
    startState: "NOTCLICKED",
    states: {
      "NOTCLICKED": function(sig, par) {
        if(sig == 'clicked')
          sm.goToState('CLICKED');
      },
      "CLICKED": function(sig, par) {
        if(sig == "$enter")
          div.innerHTML = 'hello world';
      }
    });
}
```

SM in the view of the application programmer
--------------------------------------------
In the world of SM, the application is responsible for repeatedly calling 'sm.doEvents()'. This could e.g.
be implemented as a setInterval function:

  function tick() {
    sm.doEvents();
  }
  
  window.setInterval(tick, 10);
  
For a game 100 frames per second is a fair enough goal (screen refresh rates range from 30 Hz to well over 100 Hz).

Having tick run every 10th millisecond, means the slowest some object in the game will react to something,
is 10 milliseconds. How much real time is spent between the event happening and being published to sm
(e.g. when the mouse is clicked) until the next 'tick' happens, which makes the relevant machine(s) react to the event.

After having setup the applications 'heart beat', the tick, you define your state machines that make up the application.
At any point in time, a machine is in a specific state. Machines react to events passed to it, and can then either
switch to another state, set some variables of it's own, call some external api (or manipulate the DOM), or publish events on it's own.

To publish events, the machine uses either sm.publish(signalName, parameterObject) is it wants other machines
(or itself) to react during the next 'tick' of the application (more info on the tick 

The application developer
is also responsible for continouosly calling the 'doEvents' API of the sm object. This function dispatches
queued events to all machines that sm has a reference to. The order of which machine gets each event
is undefined. 
