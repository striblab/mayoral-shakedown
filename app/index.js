/**
 * Main JS file for project.
 */

'use strict';

// Dependencies
/* global d3, $ */
import utilsFn from './utils.js';
import data from './mayoral-counting.js';
import rcvChart from './mayoral-chart.js';

// Setup utils function
utilsFn({ useView: false });

$(document).ready(() => {
  var leftMargin = 100;

  var r = rcvChart.init('.target-0', data, {
    baseWidth: $('#view1').width(),
    // Note we change the height of the SVG as we animate
    baseHeight: 200,
    margin: { top: 10, right: leftMargin / 3, bottom: 10, left: leftMargin }
  });
  var explanation = d3.select('.explanation');
  var svgContainer = d3.select('#view1 svg');
  var isTransitioning = false;

  // Align candidates labels with chart
  $('.candidates').css('padding-left', leftMargin + 'px');

  r.svg
    .selectAll('.round-labels .round-label, .guide-wrapper')
    .style('opacity', 0);

  var stages = [
    // The first function is for setup
    // The second function is for teardown
    [
      // 0: (Round 1) Initial state
      function() {
        console.log('Round 1');
        isTransitioning = true;
        r.drawRoundAnnotations(0);
        r.drawRoundChart(0, function() {
          isTransitioning = false;
        });
        explanation.html(
          '<strong>This is a label</strong><p>This is some text about this inital state.  And This is some text about this inital state.  And maybe a little more.</p>'
        );
      },

      // Teardown (previous to this)
      function() {
        isTransitioning = true;
        r.undrawRoundAnnotations(0);
        r.undrawRoundChart(0, function() {
          isTransitioning = false;
        });
      }
    ],

    // 1: (Round 1-2) Carry-over votes
    [
      // Setup (next to this)
      function() {
        console.log('Round 1-2: Carry-over');
        isTransitioning = true;

        // Scroll to top
        $('html, body').animate(
          {
            scrollTop: $('#view1').offset().top
          },
          1000
        );

        // Draw box
        r.drawRoundAnnotations(1);

        // Draw redistributed votes
        r.drawRoundBetween(0, true, function() {
          // Mark candidate as knocked out
          d3.select('.candidate-5').classed('candidate-eliminated', true);

          isTransitioning = false;
        });
        explanation.html('TODO: Votes carried over');

        // Open the container
        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '380px');
      },

      // Teardown (previous to this)
      function() {
        isTransitioning = true;

        r.undrawRoundAnnotations(1);
        r.undrawRoundBetween(0, true, function() {
          d3.select('.candidate-5').classed('candidate-eliminated', false);
          isTransitioning = false;
        });

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '200px');
      }
    ],

    // Round 1-2 Redistribution
    [
      function() {
        console.log('Round 1-2: Redistribution');
        isTransitioning = true;

        // Draw redistribution
        r.drawRoundBetween(0, false, function() {
          // Draw/fill annotiation rectangle
          r.drawRoundChart(1, function() {
            isTransitioning = false;
          });
        });
        explanation.html(
          'TODO: Redistribution of X candidates that were mathematically impossible to win.'
        );
      },
      function() {
        isTransitioning = true;
        r.undrawRoundChart(1, function() {
          r.undrawRoundBetween(0, false, function() {
            isTransitioning = false;
          });
        });
      }
    ],

    // Round 2: Carry-over and redistribution
    [
      function() {
        console.log('Round 2-3: Carry-over and redistribution');
        isTransitioning = true;

        // Highlight distribution
        r.svg
          .select('.vote-line-round-1.vote-line-from-4-to-1')
          .classed('vote-line-active', true);

        r.drawRoundAnnotations(2);
        r.drawRoundBetween(1, false, function() {
          d3.select('.candidate-4').classed('candidate-eliminated', true);

          r.drawRoundChart(2, function() {
            isTransitioning = false;
          });
        });

        explanation.html('TODO: Nekima is eliminated and ...');

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '560px');
      },
      function() {
        isTransitioning = true;

        r.svg
          .select('.vote-line-round-1.vote-line-from-4-to-1')
          .classed('vote-line-active', true);

        r.undrawRoundAnnotations(2);
        r.undrawRoundBetween(1, false, function() {
          d3.select('.candidate-3').classed('candidate-eliminated', false);
          isTransitioning = false;
        });

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '380px');
      }
    ],

    // Round 3-4: Carry-over and redistribution
    [
      function() {
        console.log('Round 3-4: Carry-over and redistribution');
        isTransitioning = true;

        r.drawRoundAnnotations(3);
        r.drawRoundBetween(2, false, function() {
          d3.select('.candidate-1').classed('candidate-eliminated', true);

          r.drawRoundChart(3, function() {
            isTransitioning = false;
          });
        });

        explanation.html('TODO: Hoch is eliminated and ...');

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '740px');
      },
      function() {
        isTransitioning = true;

        r.svg
          .select('.vote-line-round-1.vote-line-from-4-to-1')
          .classed('vote-line-active', true);

        r.undrawRoundAnnotations(2);
        r.undrawRoundBetween(1, false, function() {
          d3.select('.candidate-3').classed('candidate-eliminated', false);
          isTransitioning = false;
        });

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '560px');
      }
    ],

    // Round 4-5: Carry-over and redistribution
    [
      function() {
        console.log('Round 4-5: Carry-over and redistribution');
        isTransitioning = true;

        r.drawRoundAnnotations(4);
        r.drawRoundBetween(3, false, function() {
          d3.select('.candidate-2').classed('candidate-eliminated', true);

          r.drawRoundChart(4, function() {
            isTransitioning = false;
          });
        });

        explanation.html('TODO: Hodges is eliminated and ...');

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '820px');
      },
      function() {
        isTransitioning = true;

        r.svg
          .select('.vote-line-round-1.vote-line-from-4-to-1')
          .classed('vote-line-active', true);

        r.undrawRoundAnnotations(2);
        r.undrawRoundBetween(1, false, function() {
          d3.select('.candidate-3').classed('candidate-eliminated', false);
          isTransitioning = false;
        });

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '560px');
      }
    ]
  ];

  var currentStage = 0;

  var setStage = function(stage) {
    stages[stage][0]();
  };

  var unsetStage = function(stage) {
    stages[stage][1]();
  };

  var btnPrevious = d3.select('.btn-previous');
  var btnNext = d3.select('.btn-next');

  var previousStage = function() {
    d3.select('.btn-inactive').classed('btn-inactive', false);

    if (!isTransitioning) {
      if (currentStage - 1 >= 0) {
        unsetStage(currentStage);
        currentStage -= 1;
        setStage(currentStage);
      }
    }

    if (currentStage === 0) {
      btnPrevious.classed('btn-inactive', true);
    }
    if (currentStage === stages.length - 1) {
      btnNext.classed('btn-inactive', true);
    }
  };

  var nextStage = function() {
    d3.select('.btn-inactive').classed('btn-inactive', false);

    if (!isTransitioning) {
      if (currentStage + 1 < stages.length) {
        currentStage += 1;
        setStage(currentStage);
      }
    }

    if (currentStage === 0) {
      btnPrevious.classed('btn-inactive', true);
    }
    if (currentStage === stages.length - 1) {
      btnNext.classed('btn-inactive', true);
    }
  };

  btnPrevious.on('click', function() {
    previousStage();
  });

  btnNext.on('click', function() {
    nextStage();
  });

  document.onkeyup = function(e) {
    if (e && e.keyCode) {
      switch (e.keyCode) {
      case 37:
        previousStage();
        break;
      case 39:
        nextStage();
        break;
      }
    }
  };

  d3.selectAll('.navRule').on('click', function() {
    var view = d3.select(this).attr('data-view');
    $('html, body').animate(
      {
        scrollTop: $('#view' + view).offset().top
      },
      1000
    );
  });
  setStage(0);
});
