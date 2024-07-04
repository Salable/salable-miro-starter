## Salable x Miro

This repository is intended to be used as a starting point for building monetised Miro apps with Salable.

The starter code in this repository allows a user to purchase a license for a Miro team. Once the team has a license, an "Add Sticky" button allows the user to add a sticky note with "Hello World!" text to any board.

This rudimentary example is intended to showcase the core parts of monetising an app with Salable.

You'll need both the `boards:read` and `boards:write` scopes in Miro for the starter to work as intended.

<img width="383" alt="Salable and Miro starter app demonstration" src="https://github.com/Salable/salable-miro-starter/assets/8593744/ebffca1c-40dd-48fc-8670-d41d844f6e32">

If you want to learn more about Salable, read the [Quick Start Guide](https://docs.salable.app/docs/quick-start-guide) and [The Salable Way](https://docs.salable.app/docs/the-salable-way).

## Setup

1. Clone this repository.
2. `cp .env.example .env` and fill in the variables with values from your
   Salable product and Miro developer dashboard.
3. `npm start`
4. You need a `pro` and `Create` capability set up in your Salable product.

If you need any more detailed instructions on setting up a new Miro app, read the [Miro: Build Your First Hello World App](https://developers.miro.com/docs/build-your-first-hello-world-app) guide.
