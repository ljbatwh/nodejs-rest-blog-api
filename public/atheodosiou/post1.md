# Things I love about Vue

My first experience with Vue was back in February of 2018 when I was on the last year of my studies. As a final (big) project I was called to create a social network for students and instructors. So, I was searching for an easy-to-learn and powerful front-end framework and I fell on Vue.

To keep it brief, I started to read about Vue and to tell you the truth, I just loved it! At that time I had experience with Vanilla JavaScript and I was enthusiastic to try a new framework - to me.

In this blog post, I will aim to explore why Vue is the framework for me. I choose it over any other that I have tried. Maybe you will agree with me on some points or maybe you will stop reading after this line :laughing:

1. **Virtual DOM**

   The virtual DOM is used in many frameworks these days and it is great. It means the framework can work out what has changed in our state and then efficiently apply DOM updates, minimizing re-rendering and optimizing the performance of our application.

2. **Vue CLI**

   The CLI that Vue is providing, is really good and makes it easy to get started with a webpack project with Vue. In other words, the CLI is essential for rapid Vue development. The creation of a new project is easy as hell, as the coolest thing about the CLI is that it is an interactive process. By default, there is one preset that providing Babel and ESLint integration.

3. **SFC - Single File Components**

   When people code Vue, the do using SFC. SFC is a file with the `.vue` suffix that contains this parts - `javascript` `html` `css`.

   This kind of technology makes it easy to understand each component in a single place. It also makes you keep your code short for each component. So, if your component has too many lines of code, then maybe it is time to modularize it further.

   When it comes to `<style>` tag of a Vue component, Vue has an attribute called `scoped` that makes the CSS code to be fully encapsulated in the certain component. For example, let's assume that we have the bellow code

   ```css
   .title {
     text-align: center;
     font-size: 3em;
     margin-bottom: 10px;
     text-transform: uppercase;
     font-weight: bold;
     color: #fff;
     text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
   }
   ```

   Then this code, that defined in a specific component it will only exist in this specific component.

   In addition, the tags `<template>`, `script>`, `<style>` are all part of the official W3C specification. This means that every your components are valid HTML5 files. Awesome, right? :sunglasses:

4. **Vuex**

   State management is one of the main problems developers meet in web app building. To solve this, Vue offers a state management system `vuex`. It serves as a centralized store for all the components in an application, where the state can only be mutated predictably.

5. **Open Source Project**

   Last but not least, Vue is an open source JavaScript framework geared towards building user interfaces, created by Evan You. This means that Vue it is not maintained by a single corporation.

### Summary

I think Vue is an excellent choice for every JavaScript project you might be starting next. Vue's ecosystem is larger that I covered up in this post. Last thing is that Vue has been one of the fastest-growing frameworks of 2017 and I predict the growth is not going to slow down for 2018 either 2019.
