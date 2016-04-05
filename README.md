# angular-flex 1.0.2

An implementation of css flexbox for AngularJS

## Instalation

```bower install angular-flex --save```

or

```npm install angular-flex --save```

after this add the **angularFlex** module into your module dependencies

```angular.module('yourAppModule', ['angularFlex']); ```

### Documentation

This is the docs for angular-flex 1.0.1

#### flex-container

init flex context into element

```flex-container="row | column"```

#### flex-wrap

By default flex-wrap uses **wrap**

```flex-wrap="wrap | no-wrap"```

#### flex-align

By default flex-align uses **start start**

```flex-align="start|end|center|between|around start|end|center|between|around|baseline|stretch"```

e.g. for center align

```flex-align="center center"```

#### flex-item (1.0.1)

change item width

``` flex-item="{value}" ```

#### flex-order (1.0.1)

set elements order

``` flex-item flex-order="{value}" ```

#### fx-padding (1.0.1)

set element padding (default: 1em)

``` fx-padding="{value}" ```
