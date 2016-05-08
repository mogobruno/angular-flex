(function(angular){
    'use strict'

    var angularFlex = angular.module('angularFlex', []);

    angularFlex.constant('BROWSERS_PREFIX', {
        'CHROME': '-webkit-', // Android, IOS, Safari
        'FIREFOX': '-moz-',
        'EXPLORER': '-ms-',
        'OPERA': '-o-'
    });

    angularFlex.constant('WINDOW_SIZE', {
        'XL': {
            'MIN': 1920,
            'MAX': 'INFINITY'
        },
        'LG': {
            'MIN': 1280,
            'MAX': 1919
        },
        'MD': {
            'MIN': 960,
            'MAX': 1279
        },
        'SM': {
            'MIN': 600,
            'MAX': 959
        },
        'XS': {
            'MAX': 599,
            'MIN': 'INFINITY'
        }
    });

    angularFlex.constant('PROPERTIES', {
        'DISPLAY': 'display',
        'DIRECTION': 'flex-direction',
        'WRAP': 'flex-wrap',
        'JUSTIFY': 'justify-content',
        'ALIGN': 'align-items',
        'CONTENT': 'align-content',
        'GROW': 'flex',
        'ORDER': 'order',
        'PADDING':'padding'
    });

    angularFlex.constant('FLEXBOX', {
        'CONTAINER': 'flex',
        'DIRECTION': {
            'ROW': 'row',
            'ROW-REVERSE': 'row-reverse',
            'COLUMN': 'column',
            'COLUMN-REVERSE': 'column-reverse'
        },
        'WRAP': {
            'WRAP':'wrap',
            'NO-WRAP':'nowrap',
            'WRAP-REVERSE':'wrap-reverse'
        },
        'ALIGN': {
            'START':'flex-start',
            'END':'flex-end',
            'CENTER':'center',
            'BETWEEN':'space-between',
            'AROUND':'space-around',
            'BASELINE':'baseline',
            'STRETCH':'stretch',
        }
    })

    angularFlex.directive('flexContainer', function(){
        return {
            restrict: 'A',
            controller: flexContainerController
        }
    });

    angularFlex.directive('flexItem', function(){
        return {
            restrict: 'A',
            require: '^^flexContainer',
            controller: flexItemController
        }
    });

    angularFlex.directive('fxPadding', function(PROPERTIES){
        return {
            restrict: 'A',
            controller: fxPaddingController
        }
    });

    angularFlex.service('WindowSize', function($window, WINDOW_SIZE){
        this.change = function(resolve){
            angular.element($window).bind('resize', function WindowResize(event){
                Object.keys(WINDOW_SIZE).forEach(function(key){
                    var SIZES = WINDOW_SIZE[key];
                    if((SIZES.MIN === 'INFINITY' || SIZES.MIN <= window.innerWidth) &&
                       (SIZES.MAX === 'INFINITY' || SIZES.MAX >= window.innerWidth)){
                        resolve(key);
                    }
                });
            });
        };
    });

    function flexContainerController ($element, $attrs, BROWSERS_PREFIX, PROPERTIES, FLEXBOX) {
        if(FLEXBOX.DIRECTION[direction])
            throw new Error('flexContainer needs a direction (e.g. flex-container="row")');
        
        var justify;
        var align;

        var direction = upperCase($attrs.flexContainer);
        var wrap = upperCase($attrs.flexWrap);
        var content = upperCase($attrs.flexContent);
        if($attrs.flexAlign) {
            var aligns = $attrs.flexAlign.toUpperCase().split(' ');
            justify = upperCase(aligns[0]);
            align = upperCase(aligns[1]);
        }

        $element.css(PROPERTIES.DISPLAY, FLEXBOX.CONTAINER);
        $element.css(PROPERTIES.DIRECTION, FLEXBOX.DIRECTION[direction]);
        $element.css(PROPERTIES.WRAP, FLEXBOX.WRAP[wrap] || FLEXBOX.WRAP.WRAP);
        $element.css(PROPERTIES.JUSTIFY, FLEXBOX.ALIGN[justify] || FLEXBOX.ALIGN.START);
        $element.css(PROPERTIES.ALIGN, FLEXBOX.ALIGN[align] || FLEXBOX.ALIGN.START);
        $element.css(PROPERTIES.CONTENT, FLEXBOX.ALIGN[content] || FLEXBOX.ALIGN.START);
    }

    function flexItemController($element, $attrs, BROWSERS_PREFIX, PROPERTIES, FLEXBOX, WindowSize) {
        var grow = $attrs.flexItem || 1;
        var order = $attrs.flexOrder || 1;
        var shrink = 0;

        WindowSize.change(function(window){
            console.log("window "+window);
        });

        if(grow > 100 || grow < 0)
            throw new Error('Invalid value to flex item');

        $element.css(PROPERTIES.GROW, grow+' '+shrink);
        $element.css(PROPERTIES.ORDER, order);               
    }

    function fxPaddingController($element, $attrs, PROPERTIES) {
        var padding = $attrs.fxPadding || 1;
        $element.css(PROPERTIES.PADDING, padding+'em');                   
    }

    function upperCase(value) {
        return (value)? value.toUpperCase() : undefined;
    }

    


}(angular))