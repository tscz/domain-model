# domain-model
This is a playground for designing safe domain models + port/adapter architecture in typescript.

```mermaid
flowchart LR
subgraph Application 
subgraph Domain 
    Book-- has exactly one ---ISBN

end
subgraph Ports 
    BookRepository
end
subgraph Adapters 
    InMemoryDBAdapter
    MongoDBAdapter
end
InMemoryDB[(InMemoryDB)]
end

MongoDB[(MongoDB)]

BookRepository-- uses -->Book

BookRepository-. implements .-InMemoryDBAdapter
BookRepository-. implements .-MongoDBAdapter

InMemoryDBAdapter<-->InMemoryDB
MongoDBAdapter<-->MongoDB
```