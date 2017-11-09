/**
 * Data describing how the counting happened.
 */

export default [
  [
    // State (initial) 1
    [
      // Initial candidate 1
      {
        votes: 26116,
        original: true,
        from: 0
      },
      // Any flow
      {
        votes: 0,
        from: 0
      },
      {
        votes: 20125,
        original: true,
        from: 1
      },
      {
        votes: 0,
        from: 1
      },
      {
        votes: 18915,
        original: true,
        from: 2
      },
      {
        votes: 0,
        from: 2
      },
      {
        votes: 18101,
        original: true,
        from: 3
      },
      {
        votes: 0,
        from: 3
      },
      {
        votes: 15716,
        original: true,
        from: 4
      },
      {
        votes: 0,
        from: 4
      },
      // TODO: Get this number
      {
        votes: 3333,
        original: true,
        from: 5
      },
      {
        votes: 0,
        from: 5
      }
    ],

    // Redistribution of votes 1
    [
      // How many stay to the candidate.
      {
        votes: 26116,
        originalFrom: true,
        originalTo: true,
        from: 0,
        to: 0
      },
      {
        votes: 20125,
        originalFrom: true,
        originalTo: true,
        from: 1,
        to: 1
      },
      {
        votes: 18915,
        originalFrom: true,
        originalTo: true,
        from: 2,
        to: 2
      },
      {
        votes: 18101,
        originalFrom: true,
        originalTo: true,
        from: 3,
        to: 3
      },
      {
        votes: 15716,
        originalFrom: true,
        originalTo: true,
        from: 4,
        to: 4
      },
      // How many from one candidate to the next
      {
        votes: 26750 - 26116,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 0
      },
      {
        votes: 20912 - 20125,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 1
      },
      {
        votes: 19467 - 18915,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 2
      },
      {
        votes: 18574 - 18101,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 3
      },
      {
        votes: 16189 - 15716,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 4
      }
    ]
  ],
  [
    // State (after counting) 2
    [
      // Original votes.
      {
        votes: 26116,
        original: true,
        from: 0
      },
      // Votes gained
      {
        votes: 26750 - 26116,
        from: 0
      },

      {
        votes: 20125,
        original: true,
        from: 1
      },
      {
        votes: 20912 - 20125,
        from: 1
      },

      {
        votes: 18915,
        original: true,
        from: 2
      },
      {
        votes: 19467 - 18915,
        from: 2
      },

      {
        votes: 18101,
        original: true,
        from: 3
      },
      {
        votes: 18574 - 18101,
        from: 3
      },

      {
        votes: 15716,
        original: true,
        from: 4
      },
      {
        votes: 16189 - 15716,
        from: 4
      }
    ],

    // Redistribution 2
    [
      // How many stay to the candidate.
      {
        votes: 26750,
        originalFrom: true,
        originalTo: true,
        from: 0,
        to: 0
      },
      {
        votes: 20912,
        originalFrom: true,
        originalTo: true,
        from: 1,
        to: 1
      },
      {
        votes: 19467,
        originalFrom: true,
        originalTo: true,
        from: 2,
        to: 2
      },
      {
        votes: 18574,
        originalFrom: true,
        originalTo: true,
        from: 3,
        to: 3
      },
      // How many from one candidate to the next
      {
        votes: 2730,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 0
      },
      {
        votes: 1842,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 1
      },
      {
        votes: 4044,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 2
      },
      {
        votes: 5454,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 3
      }
    ]
  ],
  [
    [
      {
        votes: 30,
        original: true,
        from: 0
      },
      {
        votes: 4,
        from: 0
      },
      {
        votes: 20,
        original: true,
        from: 2
      },
      {
        votes: 23,
        from: 2
      }
    ],
    [
      {
        votes: 30,
        originalFrom: true,
        from: 0
      },
      {
        votes: 4,
        originalFrom: false,
        from: 0
      },
      {
        votes: 20,
        originalFrom: true,
        from: 2
      },
      {
        votes: 23,
        originalFrom: false,
        from: 2
      }
    ]
  ]
];
