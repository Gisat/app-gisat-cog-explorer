# Shared Features

Everything that needs to be used across multiple features belongs here.

This feature should be small as possible. Please, try to sort or generalize everything as much you can. 
Sort content to specific features (module) to have better DDD and modularity.

Right now: 
- shared application state
- general components
- shared data models

# Shared State
We try to use local state as possible, but for shared values across whole application we use shared part of the state.

Right now the app contains native React reducer implementation (actions, reducers and handlers). 

State and dispatch functions are propagated using React Context. One is for the sctual state and second for dispatch (editation) method.

Shared state in context should include only parameter needed at multiple levels of the application, not state of local components.

## Resources:
- https://react.dev/learn/scaling-up-with-reducer-and-context (=final result. Please read also chapter above about React reducers, actions and context)