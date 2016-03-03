# sm.js
State machine library for JavaScript

Why?
====

I need a simple, elegant way to express state machines in JavaScript for a couple of my projects.

I'm used to qp, Quantuum Framework, from embedded systems programming, so I'm borrowing a lot of ideas from that framework:
hierarchical state machines expressed as functions returning their parent, events passed to a general publish method, actor pattern
to structure the application components.

However, in the web development world, the resource constraints of embedded systems do not (usually) apply. So a full framework is
not necessary and would bloat the library.

Features
--------

  * Hierarchical State Machines. Exact structure yet to be determined.
  * Entry/exit events. These should implement the same outward-in, inward-out logic as qp for grokkability.
  * Dynamic creation/deletion of machines. Since one of my applications is a game, a natural way to add and
    remove state machines from the app is essential. Any number from 1 to 200 machines could exist as the
    app is running (start screen has one machine active, while in-game state hosts a constantly fluctuating
    number of game objects, implemented as machines)

Exampels
--------
To implement the library, I'm planning to express unit tests, and implementation of, three devices:

  * Reload countdown. This is the traditional mechanic of a (heavy) weapon in a game; user cannot fire until the weapon is reloaded.
  * Repeat last command behaviour. This is a somewhat contrived example of a device that "remembers" a command in an application,
    that can later be repeated on user invocation.
  * Pong game. This device would implement (part of) the traditional 70's pong arcade game. Specifically, it would clearly express
    the dynamic creation/deletion of machines as they differ from the general states of the game (1 in splash, 3+ ingame, 1ish in game
    over).
    
