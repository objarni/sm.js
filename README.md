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
   app is running. E.g. the start screen has one machine active, while in-game state hosts a constantly fluctuating
   number of game objects, implemented as state machines.
  * __No global event list__. This was one of the few annoyances with using the QP framework: it required of the
  programmer to specify a global list of events, which felt wrong and brought down the feeling of elegence. Instead,
  simple strings to identify events, used locally in actors/machines is all I need. Nothings hinders adding application-
  level checking of valid events to decrease likelyhood of simple typo mistakes.

Scoped out
----------

 * __No framework__. The lib should just simplify writing/unit testing state machines and their behaviour.
 * __No timers__. Just let the app handle this.
 * __No priorities__. Don't see any need for this.
 * __No subscriptions__. Even for 200 "live" objects, I can't see how the increased complexity of the lib/apps motivate adding this, as the resulting optimization is likely not noticeable. Instead, all objects recieve all events and have to filter themselves.

Examples
--------
To implement the library, I'm planning to express unit tests, and implementation of, three devices:

  * __Reload countdown__. This is the traditional mechanic of a (heavy) weapon in a game; user cannot fire until the weapon is reloaded.
  * __Repeat last command behaviour__. This is a somewhat contrived example of a device that "remembers" a command in an application,
    that can later be repeated on user invocation.
  * __Pong game__. This device would implement (part of) the traditional 70's pong arcade game. Specifically, it would clearly express
    the dynamic creation/deletion of machines as they differ from the general states of the game (1 in splash, 3+ ingame, 1ish in game
    over).
    
