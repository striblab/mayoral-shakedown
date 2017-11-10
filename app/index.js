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
  var stepHeight = 180;
  var leftMargin = 100;
  var r = rcvChart.init('.target-0', data, {
    baseWidth: $('#view1').width(),
    // Note we change the height of the SVG as we animate
    baseHeight: 150,
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
          '<strong>Frey landed on top in the tally of first-choice votes</strong><p>The intial count of first choice votes put Frey in the lead but not hitting the necessary 50% + 1 vote mark to win, so we start counting.</p>'
        );
      },

      // Teardown (previous to this)
      function() {}
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
          d3.selectAll('.candidate-5').classed('candidate-eliminated', true);

          isTransitioning = false;
        });
        explanation.html(
          '<strong>Carry-over</strong><p>The first step of each round is to carry-over the votes from candidates that are still in the running.</p>'
        );

        // Open the container
        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', '280px');
      },

      // Teardown (previous to this)
      function() {}
    ],

    // Round 1-2 Redistribution
    [
      function() {
        console.log('Round 1-2: Redistribution');
        isTransitioning = true;

        // Draw redistribution
        r.drawRoundBetween(0, 'redistribution', function() {
          // Draw/fill annotiation rectangle
          r.drawRoundChart(1, function() {
            isTransitioning = false;
          });
        });
        explanation.html(
          '<strong>After eliminating candidates with fewer votes, five remain</strong><p>The 2nd and 3rd choice votes get redistributed from the 10+ candidates that did not make it past the first round as they could not mathematically get enough votes to win.</p>'
        );
      },
      function() {}
    ],

    // Round 2: Carry-over and redistribution
    [
      function() {
        console.log('Round 2-3: Carry-over and redistribution');
        isTransitioning = true;
        d3.selectAll('.candidate-4').classed('candidate-eliminated', true);

        // Highlight distribution
        // r.svg
        //   .select('.vote-line-round-1.vote-line-from-4-to-1')
        //   .classed('vote-line-active', true);

        r.drawRoundAnnotations(2);
        r.drawRoundBetween(1, false, function() {
          d3.selectAll('.candidates-below').classed('show-below', true);

          r.drawRoundChart(2, function() {
            isTransitioning = false;
          });
        });

        explanation.html(
          '<strong>Levy-Pounds is out, Dehn and Hodges pick up many of her votes</strong><p>With 5,454 votes going to Dehn, he comes out in 2nd after this redistribution, pushing down Hodges to 3rd and Hoch to 4th where he will be eliminated next.</p>'
        );

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', 280 + stepHeight + 'px');
      },
      function() {}
    ],

    // Round 3-4: Carry-over and redistribution
    [
      function() {
        console.log('Round 3-4: Carry-over and redistribution');
        isTransitioning = true;
        d3.selectAll('.candidate-1').classed('candidate-eliminated', true);

        r.drawRoundAnnotations(3);
        r.drawRoundBetween(2, false, function() {
          r.drawRoundChart(3, function() {
            isTransitioning = false;
          });
        });

        explanation.html(
          '<strong>Hoch falls off, giving leader Frey another big batch of votes</strong><p>Frey gets 9,888 votes, the majority of Hoch\'s non-exhausted votes.  This gives Frey a solid lead and furthers Dehn\'s 2nd place standing.</p>'
        );

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', 280 + stepHeight * 2 + 'px');
      },
      function() {}
    ],

    // Round 4-5: Carry-over and redistribution
    [
      function() {
        console.log('Round 4-5: Carry-over and redistribution');
        isTransitioning = true;
        d3.selectAll('.candidate-2').classed('candidate-eliminated', true);

        r.drawRoundAnnotations(4);
        r.drawRoundBetween(3, false, function() {
          d3.selectAll('.candidate-3').classed('candidate-eliminated', true);
          d3.selectAll('.is-winner').classed('show-winner', true);
          d3
            .selectAll('.guide-wrapper-round-4.guide-wrapper-candidate-0')
            .classed('show-winner', true);

          r.drawRoundChart(4, function() {
            isTransitioning = false;
          });
        });

        explanation.html(
          '<strong>Hodges is eliminated, Frey bests Dehn to win</strong><p>At this point, there is little chance that Dehn would have picked up enough votes to win, but the remaining votes from Hodges is split fairly evenly among the last two candidates.  Frey comes out on top, maintaining a first place through each round.<p>'
        );

        svgContainer
          .transition()
          .ease('linear')
          .duration(500)
          .attr('height', 280 + stepHeight * 3 + 'px');
      },
      function() {}
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
