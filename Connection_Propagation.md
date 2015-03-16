This document describes the processes for propagation of Connections between Social Networking actors

When a System is queried for outbound Connections for an Actor:
  * the System first queries the Source System for Authoritative Connections.
  * the System may then add its own Non-authoritative Connections.
  * the System may also query other known System for additional Non-authoritative Connections.

When a System is queried for inbound Connections for an Actor:
  * the System first queries the Authoritative System of the Actor for Outbound Connections and Authoritative Inbound Connection for the Actor
  * the System then queries the Authoritative System of the Targets of the Outbound Connections for matching Outbound Connections to the Target
  * The System may add its own Non-authoritative Connections
  * The System may also query other known Systems for additional Non-authoritative Connections.