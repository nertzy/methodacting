Definitions of terminology used in Actor-based Social Networking system

|Actor | An object in the social networking system |
|:-----|:------------------------------------------|
|Connection |  a unidirectional link from a source Actor to a target Actor |
|System | A site that implements/supports the social networking standard |
|Source | The outbound side of a Connection |
|Target | The inbound side of a Connection |
|Outbound Connection | A Connection where the Actor is the Source of the Connection |
|Inbound Connection | A Connection where the Actor is the Target of the Connection |
|Authoritative System | The System where an Actor exists |
|Authoritative Connection | A Connection that exists in the same System as the Source Actor |
|Non-authoritative Connection | A Connection that exists in a System other than the System where the Source Actor exists |

**Actors exist in a single System.** Connections can exist in any System.
**Authoritative Connections only exist in the System where the Source exists.** Non-authoritative Connections can exist in any System.