(function(angular){
    'use strict'

    var angularFlex = angular.module('angularFlex', []);

    angularFlex.constant('BROWSERS_PREFIX', {
        'CHROME': '-webkit-', // Android, IOS, Safari
        'FIREFOX': '-moz-',
        'EXPLORER': '-ms-',
        'OPERA': '-o-'
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

    angularFlex.directive('flexContainer', function(BROWSERS_PREFIX, PROPERTIES, FLEXBOX){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                
                if(FLEXBOX.DIRECTION[direction])
                    throw new Error('flexContainer needs a direction (e.g. flex-container="row")');
                
                var justify;
                var align;

                var direction = (attrs.flexContainer)?attrs.flexContainer.toUpperCase(): undefined;
                var wrap = (attrs.flexWrap)? attrs.flexWrap.toUpperCase() : undefined;
                var content = (attrs.flexContent)? attrs.flexContent.toUpperCase(): undefined;
                if(attrs.flexAlign) {
                    var aligns = attrs.flexAlign.toUpperCase().split(' ');
                    justify = (aligns[0])? aligns[0].toUpperCase() : undefined;
                    align = (aligns[1])? aligns[1].toUpperCase() : undefined;
                }

                element.css(PROPERTIES.DISPLAY, FLEXBOX.CONTAINER);
                element.css(PROPERTIES.DIRECTION, FLEXBOX.DIRECTION[direction]);
                element.css(PROPERTIES.WRAP, FLEXBOX.WRAP[wrap] || FLEXBOX.WRAP.WRAP);
                element.css(PROPERTIES.JUSTIFY, FLEXBOX.ALIGN[justify] || FLEXBOX.ALIGN.START);
                element.css(PROPERTIES.ALIGN, FLEXBOX.ALIGN[align] || FLEXBOX.ALIGN.START);
                element.css(PROPERTIES.CONTENT, FLEXBOX.ALIGN[content] || FLEXBOX.ALIGN.START);
            }
        }
    });

    angularFlex.directive('flexItem', function(BROWSERS_PREFIX, PROPERTIES, FLEXBOX){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var grow = attrs.flexItem || 1;
                var order = attrs.flexOrder || 1;
                var shrink = 0;

                if(grow > 100 || grow < 0)
                    throw new Error('Invalid value to flex item');

                element.css(PROPERTIES.GROW, grow+' '+shrink);
                element.css(PROPERTIES.ORDER, order);
                                
            }
        }
    });

    angularFlex.directive('fxPadding', function(PROPERTIES){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var padding = attrs.fxPadding || 1;
                element.css(PROPERTIES.PADDING, padding+'em');                
            }
        }
    });


}(angular))