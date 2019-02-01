# Testing React Hooks

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Main Goal

To understand, explore, and play with React Hooks

## What it is actually?

An React App that shows cards of Star Wars characters. I nicknamed it "SWDB". It may grow, but for now I'm only focusing on using hooks.

It uses SWAPI for Star Wars data, and Google Custom Search for images.

## How to run

This was bootstrapped with `create-react-app`, so basically what you need to do after cloning is installing the packages and run the start script

```
# HTTPS
git clone https://github.com/Andrewmat/testing-hooks.git

# SSH
git clone git@github.com:Andrewmat/testing-hooks.git

cd testing-hooks

# Yarn
yarn
yarn start

# NPM
npm install
npm start
```

Ohhh, I forgot to add. It also uses the Google Custom Search API. If you want to see the images, you will need to generate an API key for you and add these into an `.env.local` file

These are the environment variables inside `.env.local`:

```
APP_GOOGLESEARCH_API_KEY=<<MY API KEY>>
APP_GOOGLESEARCH_CONTROL_ID=<<MY CONTROL SEARCH ID>>
```

## So... where is the hook?

Inside the `/src/hooks` there are multiple hooks that I developed. I'm avoiding using external package dependencies, and focusing only on the original React resources for now

### useToggle

It simply stores an boolean value, and returns a function to toggle it. If no argument is given, the initial value is false

```jsx
function MyComponent() {
  const initialValue = true
  const [myBool, toggleMyBool] = useToggle(initialValue)
}
```

### useCounter

It returns the current value, and an increment function, in array form

```jsx
function MyComponent() {
  const [value, increment] = useCounter
  return <button onClick={increment}>value</button>
}
```

### useDocumentTitle

It receives an title to apply to the document. It also returns to the previous title when the component unmounts

```jsx
function MyComponent() {
  useDocumentTitle('Example Title')
  // ...
}
```

### useIterator

It receives an array, and returns an controller to iterate in this array

```jsx
function MyComponent() {
  const myList = ['Alice', 'Ben', 'Charles']
  const iterator = useIterator(list)
  return (
    <>
      <button onClick={iterator.previous}>Previous</button>
      {iterator.item}
      <button onClick={iterator.next}>Next</button>
    </>
  )
}
```

useIterator also can received two more arguments

```jsx
// loop: Whether or not should the list loop. Defaults to false
// startIndex: What index should be the initial item. Defaults to 0
useIterator(list, loop, startIndex)
```

The controller returned by this hook is composed of the following attributes:

```jsx
const iterator = useIterator(list)

// current item being iterated
iterator.item

// index of the current item
iterator.index

// function to iterate to the next item on the list
// returns the controller so it can be chained
const nextIterator = iterator.next()

// function to iterate to the previous item on the list
// returns the controller so it can be chained
const previousIterator = iterator.previous()

// boolean that detects if it has a next item on the list
// it also accounts if the iterator loops
iterator.hasNext

// boolean that detects if it has a previous item on the list
// it also accounts if the iterator loops
iterator.hasPrevious
```

### useCache

A "complex" system to use cache in the application. It uses the CacheProvider (inside `/src/components`) that creates an context used for caching resources

It receives an async function, and it returns an async function that mimics the given function, using caching resources whenever possible

```jsx
function myFetch(id) {
  returns fetch(`${apiUrl}/${id}`)
}

function MyComponent() {
  const myCachedFetch = useCache(myFetch)

  return (
    <MyAnotherComponent onChange={myCachedFetch} />
  )
}
```

It also receives a config object as second parameter. The config object is the following:

```jsx
const cacheConfig = {
  // string describing caching namespace to use.
  // Very recommended to avoid cache collision
  // when cache is used in different contexts
  namespace,

  // optional function that generates key
  // It receives an array of parameters and must return an string
  keyGenerator,

  // optional key of cache entry
  // It overwrites the keyGenerator function
  key,
}
useCache(myFetch, cacheConfig)

```

The returned function also has a new attribute: `clearCache`, a function that removes all the entries from the cache of the given namespace

```jsx
function MyComponent({ data }) {
  const cachedFetch = useCache(myFetch, { namespace: 'my-fetch' })

  return (
    <>
      <button onClick={() => cachedFetch(data)}>Fetch data<button>
      <button onClick={() => cachedFetch.clearCache()}>Reset cache<button>
    </>
  )
}
```

## What about components?

There are also some components that I developed using the aforementioned custom hooks, as well as the original React hooks.

### Async

TODO

### Card

TODO

### Carousel

TODO

### CacheProvider

TODO

### Thanks

Thanks for these guys there:

* SWAPI, for all the data and support it gives for free, and for all the times it received tens of requests because of some infinite loop bug that I created.
* React Team, for all the effort into creating the Hooks idea, one that may create a new paradigm inside Frontend (and UI in general) development.