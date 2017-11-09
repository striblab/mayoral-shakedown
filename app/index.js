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
utilsFn({ setView: false });

$(document).ready(() => {
  var r = rcvChart.init('.target-0', data, {
    baseWidth: $('#view1').width(),
    // Note we change the height of the SVG as we animate
    baseHeight: 200
  });
  var explanation = d3.select('.explanation');
  var controls = d3.select('.controls');
  var svgContainer = d3.select('#view1 svg');
  var isTransitioning = false;

  r.svg
    .selectAll('.round-labels .round-label, .guide-wrapper')
    .style('opacity', 0);

  var stages = [
    // The first function is for setup
    // The second function is for teardown
    [
      // Initial state
      function() {
        isTransitioning = true;
        r.drawRoundAnnotations(0);
        r.drawRoundChart(0, function() {
          isTransitioning = false;
        });
        explanation.html(
          'If any candidate wins a majority of first choice votes, he or she is the winner. Candidate A came close, but did not reach the threshold.'
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
    [
      // Setup (next to this)
      function() {
        isTransitioning = true;

        // Scroll to top
        $('html, body').animate(
          {
            scrollTop: $('#view1').offset().top
          },
          1000
        );

        // Draw transfer of votes
        r.drawRoundAnnotations(1);

        // Draw redistributed votes
        r.drawRoundBetween(0, true, function() {
          // Mark candidate as knocked out
          d3.select('.candidate-5').classed('candidate-eliminated', true);
          isTransitioning = false;
        });
        explanation.html(
          'Since no candidate won a majority, we continue to Round 2. The candidate with the fewest votes is eliminated.'
        );

        // Open the container
        svgContainer
          .transition()
          .ease('linear')
          .duration(250)
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
        controls
          .transition()
          .ease('linear')
          .duration(1000)
          .style('top', '200px');
      }
    ],
    [
      function() {
        isTransitioning = true;
        r.svg
          .select('.vote-line-round-0.vote-line-from-1-to-3')
          .classed('vote-line-active', false);
        r.drawRoundBetween(0, false, function() {
          r.drawRoundChart(1, function() {
            isTransitioning = false;
          });
        });
        explanation.html(
          'Votes for eliminated candidates are redistributed based on voters&rsquo; second or third choice votes.'
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
    [
      function() {
        r.svg
          .select('.vote-line-round-0.vote-line-from-1-to-3')
          .classed('vote-line-active', true);
        explanation.html(
          'For example, if a voter selected Candidate B as her first choice and Candidate D as her second, her vote would have moved to Candidate D.'
        );
      },
      function() {
        r.svg
          .select('.vote-line-round-0.vote-line-from-1-to-3')
          .classed('vote-line-active', false);
      }
    ],
    [
      function() {
        isTransitioning = true;
        r.svg
          .select('.vote-line-round-0.vote-line-from-1-to-3')
          .classed('vote-line-active', false);
        explanation.html(
          'Still, no candidate has reached the threshold. The candidate with the least votes is eliminated again, with his or her votes redistributed.'
        );
        r.drawRoundAnnotations(2);
        r.drawRoundBetween(1, true, function() {
          d3.select('.candidate-3').classed('candidate-eliminated', true);
          r.drawRoundBetween(1, false, function() {
            isTransitioning = false;
          });
        });
        controls
          .transition()
          .ease('linear')
          .duration(1000)
          .style('top', '560px');
      },
      function() {
        isTransitioning = true;
        r.undrawRoundAnnotations(2);
        r.undrawRoundBetween(1, false, function() {
          d3.select('.candidate-3').classed('candidate-eliminated', false);
          isTransitioning = false;
        });
        controls
          .transition()
          .ease('linear')
          .duration(1000)
          .style('top', '380px');
      }
    ],
    [
      function() {
        isTransitioning = true;
        explanation.html(
          'With this redistribution, Candidate C reached the threshold and is the winner.'
        );
        r.drawRoundChart(2, function() {
          d3.select('.candidate-0').classed('candidate-eliminated', true);
          r.svg
            .selectAll('.vote-line-chart-round-2.vote-line-from-candidate-2')
            .transition()
            .ease('linear')
            .duration(500)
            .style('stroke-opacity', 0.7);
          r.svg
            .select('.guide-wrapper-round-2.guide-wrapper-candidate-2 .guide')
            .transition()
            .ease('linear')
            .duration(500)
            .style('stroke', '#333')
            .each('end', function() {
              isTransitioning = false;
            });
        });
      },
      function() {
        isTransitioning = true;
        r.undrawRoundChart(2, function() {
          d3.select('.candidate-0').classed('candidate-eliminated', false);
          isTransitioning = false;
        });
        r.svg
          .selectAll('.vote-line-chart-round-2.vote-line-from-candidate-2')
          .style('stroke-opacity', 0.5);
        r.svg
          .select('.guide-wrapper-round-2.guide-wrapper-candidate-2 .guide')
          .style('stroke', '#999');
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
