Use cases and other rough notes on creating a connect-the-dots demo for the transparent federal budget project and uses the actor-based social networking system

System has two main components: actors, and connections between actors.
Also has access to reputation systems

Actor information:
  * Identity
  * Name
  * Creator

Connection information:
  * Identity
  * Description
  * Type
  * Creator
  * source actor
  * target actor

Example actors:
  * Bill
  * Earmark (on bill)
  * Senate committee (that added earmark to bill)
  * Senator (on the committee)
  * Company (that donated to the senator)

Functions:
  * Add new actors
  * Add new connections between objects
  * Inspect an actor's information
  * Get all connections from an actor
  * Get all connections to an actor
  * Inspect a connection's information
  * Vote on a connection
  * Vote on an actor
  * Find existing actors
> 8 Explore connection (expand actor)

Longer term:
  * Merge two actors
  * Merge two links

Other questions:
  * how many levels to display?


Page flow:
> a) login user/pasword

> options:
    * search (for actors)
    * create (an actor)

One actor:
  * start over (clear)
  * search (for additional actors)
  * create (an actor)
  * inspect actor information
  * hide actor
  * expand actor (displays connections and connected actors)
    1. outbound only
    1. inbound only
    1. all connections

Two or more actors:
  * start over (clear)
  * search (for additional actors)
  * create (an actor)

  * connect two actors
  * hide connection
  * inspect connection information

  * expand an actor (displays connections and connected actors)
    1. outbound only
    1. inbound only
    1. all connections
  * hide actor (and all connections to/from that actor)
  * inspect actor information


Viewing actor information:
  * close
  * vote on actor (+/-/0 and comment)

Viewing connection information:
  * close
  * vote on connection (+/-/0 and comment)