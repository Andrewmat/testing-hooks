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

It also uses the Google Custom Search API. If you want to see the images, you will need to generate an API key for you and add these into an `.env.local` file

These are the environment variables inside `.env.local`:

```
APP_GOOGLESEARCH_API_KEY=<<MY API KEY>>
APP_GOOGLESEARCH_CONTROL_ID=<<MY CONTROL SEARCH ID>>
```

## So... where is the hook?

Inside the `/src/hooks` there are multiple hooks that I developed. I'm avoiding using external package dependencies, and focusing only on the original React resources for now

### useToggle

**Standalone hook**

It stores one of two options, and returns the current option and a function that changes to the other option.
As default, it simply changes between booleans, with false as initial value.

```jsx
function MyComponent() {
  const [myBool, toggleMyBool] = useToggle()

  // button label is false/true
  return (
    <button onClick={toggleMyBool}>
      {myBool}
    </button>
  )
}
```

It also can receive a initial boolean value

```jsx
function MyComponent() {
  const initialValue = true
  const [myBool, toggleMyBool] = useToggle(initialValue)

  // button label is true/false
  return (
    <button onClick={toggleMyBool}>
      {myBool}
    </button>
  )
}
```

It also can receive an array of two elements, and if so, it toggles between then. The index 0 will be the initial value in this case

```jsx
function MyComponent() {
  const [theme, toggleTheme] = useToggle(['blue', 'pink'])

  return (
    <>
      This is the {theme} theme!
      <button onClick={toggleTheme} className={`${theme}-theme`}>
        Toggle
      </button>
    </>
  )
}
```


### useCounter

**Standalone hook**

It returns the current value, and an increment function, in array form

```jsx
function MyComponent() {
  const [value, increment] = useCounter
  return <button onClick={increment}>value</button>
}
```

### useDocumentTitle

**Standalone hook**

It receives an title to apply to the document. It also returns to the previous title when the component unmounts

```jsx
function MyComponent() {
  useDocumentTitle('Example Title')
  // ...
}
```

### useIterator

**Standalone hook**

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

It receives a namespace as second argument. If not set, it uses `__root` as default, althought I recommend to always use it to avoid name clashes between diferent contexts

```jsx
function MyComponent() {
  const myCachedFetch = useCache(myFetch, 'myNamespace')

  return (
    <MyAnotherComponent onChange={myCachedFetch} />
  )
}
```

It also receives a config object as third parameter. The config object is as follows:

```jsx
const cacheConfig = {
  // optional function that generates key
  // It receives an array of parameters and must return an string
  keyGenerator,

  // optional key of cache entry
  // It overwrites the keyGenerator function
  key,

  // optional key to limit entries inside the namespace
  limit
}
useCache(myFetch, 'myNamespace', cacheConfig)

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

**Standalone component**

It receives an async function as prop, and resolves/reject it using render props

```jsx
function MyComponent() {
  return (
    <Async promise={myFetch}>
      {(data, error) => {
        if (error) {
          console.error(error);
          return <p>Something is wrong</p>;
        }
        return <div>{data}</div>;
      }}
    </Async>
}
```

It can also receive a `deps` prop. `deps` is an control array, so the async function is only executed when an value inside it is changed.

```jsx
function MyComponent({ id }) {
  return (
    <Async promise={() => myFetch(id)} deps={[id]}>
      {(data, error) => {
        if (error) {
          console.error(error);
          return <p>Something is wrong</p>;
        }
        return <div>{data}</div>;
      }}
    </Async>
}
```

It uses `useReducer` to manipulate the promise state and `useEffect` to call the promise.

### Card

It receives data for display. It also uses this data to make a request for Google Custom Search looking for images related to this data (in this case in particular, Star Wars Characters)

It uses `useDocumentTitle` to set document title according to data and `useCache` to cache the response of Google Custom Search

### Carousel

**Standalone component**

Despite the name, it is not actually a carousel. It receives multiple children, and render buttons to iterate among them

```jsx
function MyComponent() {
  return (
    <Carousel
      // first child to be shown. Defaults to zero
      startIndex={0}

      // what should be rendered before the Carousel
      // it should be a render function that receives props and return a component
      // defaults to a previous button
      before={renderFunction}

      // what should be rendered after the Carousel
      // it should be a render function that receives props and return a component
      // defaults to a next button
      after={renderFunction}

      // whether or not the carousel should loop
      // defaults to false
      loop={false}

      // optional function that executes whenever the shown child is changed
      onChange={changeListener}
    >
      {/* It chooses among one of the children to render */}
      <Component1/>
      <Component2/>
      <Component3/>
    </Carousel>
  )
}
```

The before and after props should be render function that receives the following props

```jsx
function MyCarouselController({
  // function that when called, iterates to the previous child
  previous,

  // function that when called, iterates to the next child
  next,

  // if does not have previous child to be shown
  // if loop is true, it always returns false
  isFirst,

  // if does not have next child to be shown
  // if loop is true, it always returns false
  isLast
}) {
  return (
    <>
      <button onClick={previous} disabled={isFirst}>Previous</button>
      <button onClick={next} disabled={isLast}>Next</button>

    </>
  )
}
```

It uses `useIterator` to iterate among its children

### CacheProvider

Wrapper of the cache context. It initializes the context, creates the cache accessors, and wraps its children with the cache context provider.

```jsx
function MyComponent() {
  return (
    <CacheProvider>
      <ComponentWithCacheAccess />
    </CacheProvider>
  )
}
```

The acessor are created through its function `getCache(namespace)`. This function is provided to the cache context value.

This context uses the following format:

```javascript
const cacheContextValue = {
  // this is only used for storage, and should not be used
  caches: {
    [namespace]: new Map(),
    [namespace2]: new Map(),
  },

  // function that returns a cache with the given namespace
  getCache = namespace => ({
    // size of the cache
    size,

    // function that given a key for an entry, returns its value
    get: key => value,

    // function that sets or updates a cache entry
    set: (key, value) => undefined,

    // function that removes a cache entry
    remove: key => undefined,

    // function that removes all entries from this cache
    clear: () => undefined,
  })
}
```

It is used by `useCache` to store and access cache

It uses `useContext` to consume the cache context, and `useState` to manage the cache context value

### CardIterator

TODO

## Thanks

Thanks for these guys here:

* SWAPI, for all the data and support it gives for free, and for all the times it received tens of requests because of some infinite loop bug that I created.
* React Team, for all the effort into creating the Hooks idea, one that may create a new paradigm inside Frontend (and UI in general) development.