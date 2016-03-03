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

  * __Hierarchical State Machines__. Exact structure yet to be determined.
  * __Entry/exit events__. These should implement the same outward-in, inward-out logic as qp for grokkability.
  * __Dynamic creation/deletion of machines__. Since one of my applications is a game, a natural way to add and
   remove state machines from the app is essential. Any number from 1 to 200 machines could exist as the
   app is running (start screen has one machine active, while in-game state hosts a constantly fluctuating
   number of game objects, implemented as machines)

Scoped out
----------

 * __No framework__. the lib should just simplify writing/unit testing state machines and their behaviour
 * __Timers__. Just let the app handle this.
 * __Priorities__. Don't see any need for this.
 * __Subscription__. Even for 200 "live" objects, it should be quick enough on even a low-end mobile phone.
  All objects recieve all events.

Examples
--------
To implement the library, I'm planning to express unit tests, and implementation of, three devices:

  * __Reload countdown__. This is the traditional mechanic of a (heavy) weapon in a game; user cannot fire until the weapon is reloaded.
  * __Repeat last command behaviour__. This is a somewhat contrived example of a device that "remembers" a command in an application,
    that can later be repeated on user invocation.
  * __Pong game__. This device would implement (part of) the traditional 70's pong arcade game. Specifically, it would clearly express
    the dynamic creation/deletion of machines as they differ from the general states of the game (1 in splash, 3+ ingame, 1ish in game
    over).
    
