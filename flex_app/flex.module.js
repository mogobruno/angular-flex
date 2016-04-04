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
        'DIRECTION':'flex-direction',
        'WRAP': 'flex-wrap',
        'JUSTIFY':'justify-content',
        'ALIGN':'align-items',
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
            'STRECH':'stretch',
        }
    })

    angularFlex.directive('flexContainer', function(BROWSERS_PREFIX, PROPERTIES, FLEXBOX){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                
                var justify;
                var align;

                var wrap = (attrs.flexWrap)? attrs.flexWrap.toUpperCase() : undefined;

                var direction = (attrs.flexContainer)?attrs.flexContainer.toUpperCase(): undefined;
                
                if(attrs.flexAlign) {
                    var aligns = attrs.flexAlign.toUpperCase().split(' ');
                    justify = aligns[0].toUpperCase();
                    align = aligns[1].toUpperCase();
                }

                if(FLEXBOX.DIRECTION[direction]){
                    element.css(PROPERTIES.DISPLAY, FLEXBOX.CONTAINER);
                    element.css(PROPERTIES.DIRECTION, FLEXBOX.DIRECTION[direction]);
                    element.css(PROPERTIES.WRAP, FLEXBOX.WRAP[wrap] || FLEXBOX.WRAP.WRAP);
                    element.css(PROPERTIES.JUSTIFY, FLEXBOX.ALIGN[justify] || FLEXBOX.ALIGN.START);
                    element.css(PROPERTIES.ALIGN, FLEXBOX.ALIGN[align] || FLEXBOX.ALIGN.START);
                }else{
                    throw new Error('flexContainer needs a direction (e.g. flex-container="row")');
                }
            }
        }
    });

    angularFlex.directive('flexItem', function(BROWSERS_PREFIX, PROPERTIES, FLEXBOX){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.css('color', 'red');
            }
        }
    });


}(angular))