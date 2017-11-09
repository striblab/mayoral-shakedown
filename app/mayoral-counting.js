/**
 * Data describing how the counting happened.
 */

// [ Rounds:
//   [
//     [ Inital state
//       { }
//     ],
//     [ How redistribution happens
//       { }
//     ]
//   ],
//   ...
// ]

export default [
  [
    // Round 0 - 1
    [
      // Intial state of votes
      // Initial candidate 1
      // Frey
      {
        votes: 26116,
        original: true,
        from: 0
      },
      // Any flow (needed becuase ?)
      {
        votes: 0,
        from: 0
      },

      // Hoch
      {
        votes: 20125,
        original: true,
        from: 1
      },
      {
        votes: 0,
        from: 1
      },

      // Hodges
      {
        votes: 18915,
        original: true,
        from: 2
      },
      {
        votes: 0,
        from: 2
      },

      // Dehn
      {
        votes: 18101,
        original: true,
        from: 3
      },
      {
        votes: 0,
        from: 3
      },

      // Levy
      {
        votes: 15716,
        original: true,
        from: 4
      },
      {
        votes: 0,
        from: 4
      },

      // All the rest
      {
        votes:
          1233 +
          756 +
          711 +
          612 +
          477 +
          438 +
          335 +
          325 +
          220 +
          184 +
          138 +
          119 +
          1,
        original: true,
        from: 5
      },
      {
        votes: 0,
        from: 5
      }
    ],

    // Round 0-1: Redistribution of votes
    [
      // How many stay to the candidate.
      // Frey
      {
        votes: 26116,
        originalFrom: true,
        originalTo: true,
        from: 0,
        to: 0
      },

      // Hoch
      {
        votes: 20125,
        originalFrom: true,
        originalTo: true,
        from: 1,
        to: 1
      },

      // Hodges
      {
        votes: 18915,
        originalFrom: true,
        originalTo: true,
        from: 2,
        to: 2
      },

      // Dehn
      {
        votes: 18101,
        originalFrom: true,
        originalTo: true,
        from: 3,
        to: 3
      },

      // Levy
      {
        votes: 15716,
        originalFrom: true,
        originalTo: true,
        from: 4,
        to: 4
      },

      // How many from one candidate to the next
      // Other - Levy
      {
        votes: 26750 - 26116,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 0
      },

      // Other to Hoch
      {
        votes: 20912 - 20125,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 1
      },

      // Other to Hodges
      {
        votes: 19467 - 18915,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 2
      },

      // Other to Dehn
      {
        votes: 18574 - 18101,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 3
      },

      // Other to Levy
      {
        votes: 16189 - 15716,
        originalFrom: true,
        originalTo: false,
        from: 5,
        to: 4
      }
    ]
  ],

  // Round 1-2
  [
    // State of start of Round 1
    [
      // Frey
      {
        votes: 26116,
        original: true,
        from: 0
      },
      {
        votes: 26750 - 26116,
        from: 0
      },

      // Hoch
      {
        votes: 20125,
        original: true,
        from: 1
      },
      {
        votes: 20912 - 20125,
        from: 1
      },

      // Hodges
      {
        votes: 18915,
        original: true,
        from: 2
      },
      {
        votes: 19467 - 18915,
        from: 2
      },

      // Dehn
      {
        votes: 18101,
        original: true,
        from: 3
      },
      {
        votes: 18574 - 18101,
        from: 3
      },

      // Levy
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

    // Redistribution 1-2 (Nekima out)
    [
      // How many stay to the candidate.
      // Frey
      {
        votes: 26750,
        originalFrom: true,
        originalTo: true,
        from: 0,
        to: 0
      },

      // Hoch
      {
        votes: 20912,
        originalFrom: true,
        originalTo: true,
        from: 1,
        to: 1
      },

      // Hodges
      {
        votes: 19467,
        originalFrom: true,
        originalTo: true,
        from: 2,
        to: 2
      },

      // Dehn
      {
        votes: 18574,
        originalFrom: true,
        originalTo: true,
        from: 3,
        to: 3
      },

      // How many from one candidate to the next
      // Levy to Frey
      {
        votes: 2730,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 0
      },

      // Levy to Hoch
      {
        votes: 1842,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 1
      },

      // Levy to Hodges
      {
        votes: 4044,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 2
      },

      // Levy to Dehn
      {
        votes: 5454,
        originalFrom: true,
        originalTo: false,
        from: 4,
        to: 3
      }
    ]
  ],

  // Round 2-3
  [
    // State of start of Round 2
    [
      // Frey
      {
        votes: 26750,
        original: true,
        from: 0
      },
      {
        votes: 2730,
        from: 0
      },

      // Hoch
      {
        votes: 20912,
        original: true,
        from: 1
      },
      {
        votes: 1842,
        from: 1
      },

      // Hodges
      {
        votes: 19467,
        original: true,
        from: 2
      },
      {
        votes: 4044,
        from: 2
      },

      // Dehn
      {
        votes: 18101,
        original: true,
        from: 3
      },
      {
        votes: 5454,
        from: 3
      }
    ],

    // Redistribution 2-3 (Hoch out)
    [
      // How many stay to the candidate.
      // Frey
      {
        votes: 29480,
        originalFrom: true,
        originalTo: true,
        from: 0,
        to: 0
      },

      // Hoch out

      // Hodges
      {
        votes: 23511,
        originalFrom: true,
        originalTo: true,
        from: 2,
        to: 2
      },

      // Dehn
      {
        votes: 24028,
        originalFrom: true,
        originalTo: true,
        from: 3,
        to: 3
      },

      // How many from one candidate to the next
      // Hoch to Frey
      {
        votes: 9888,
        originalFrom: true,
        originalTo: false,
        from: 1,
        to: 0
      },

      // Hoch to Hodges
      {
        votes: 3364,
        originalFrom: true,
        originalTo: false,
        from: 1,
        to: 2
      },

      // Hoch to Dehn
      {
        votes: 3330,
        originalFrom: true,
        originalTo: false,
        from: 1,
        to: 3
      }
    ]
  ],

  // Round 3-4
  [
    // State of start of 3
    [
      // Frey
      {
        votes: 29480,
        original: true,
        from: 0
      },
      {
        votes: 9888,
        from: 0
      },

      // Hodges
      {
        votes: 23511,
        original: true,
        from: 2
      },
      {
        votes: 3364,
        from: 2
      },

      // Dehn
      {
        votes: 24028,
        original: true,
        from: 3
      },
      {
        votes: 3330,
        from: 3
      }
    ],

    // Redistribution 3-4 (Hodges out)
    [
      // How many stay to the candidate.
      // Frey
      {
        votes: 39368,
        originalFrom: true,
        originalTo: true,
        from: 0,
        to: 0
      },

      // Hodges out

      // Dehn
      {
        votes: 27358,
        originalFrom: true,
        originalTo: true,
        from: 3,
        to: 3
      },

      // How many from one candidate to the next
      // Hoch to Frey
      {
        votes: 7348,
        originalFrom: true,
        originalTo: false,
        from: 2,
        to: 0
      },

      // Hoch to Dehn
      {
        votes: 7613,
        originalFrom: true,
        originalTo: false,
        from: 2,
        to: 3
      }
    ]
  ],

  // Round 4
  [
    // State of start of 4
    [
      // Frey
      {
        votes: 39368,
        original: true,
        from: 0
      },
      {
        votes: 7348,
        from: 0
      },

      // Dehn
      {
        votes: 27358,
        original: true,
        from: 3
      },
      {
        votes: 7613,
        from: 3
      }
    ]

    // Redistribution 4-
    // None
  ]
];
