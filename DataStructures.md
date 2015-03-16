Definitions of the data structures for objects in the social networking system

Actor:
  * ID
  * Name
  * Description
  * Active Flag
  * Creating User

Connection:
  * ID
  * Source Actor
  * Target Actor
  * Connection Type
  * Description

Vote:
  * Voting Actor
  * Object of vote (either connection or actor)
  * Vote value (+, -, or 0)
  * Vote Reason