export const level = `query {
transaction_aggregate(where: {
        _and: [
          { type: { _like: "level" } },
          { originEventId: { _eq: 41 } }
        ]
      }) {
        aggregate {
          max {
            amount
          }
        }
      }
}
    `;

export const xp = `query {
transaction_aggregate(where: {
        _and: [
          { type: { _like: "xp" } },
          { 
            _or: [
              { originEventId: { _eq: 41 } },
              { path: { _ilike: "/oujda/module/checkpoint/%" } },
              { path: { _ilike: "/oujda/module/piscine-js" } }
            ]
          }
        ]
      }) {
        aggregate {
          sum {
            amount
          }
        }
      }
}
    `;

export const info = `
  query {
     user {
     login
      firstName
      lastName
      attrs
      campus
      auditRatio
   }
  }
    `;

export const projects = `query {
      projects: transaction(
        order_by: { createdAt: desc },
        where: {
          _and: [
            { type: { _like: "xp" } },
            { originEventId: { _eq: 41 } }
          ]
        }
      ) {
        path
    progress : amount
    createdAt
      }
}

    `;

export const go = `query {
      go_valid_exercise: transaction_aggregate(where: {
        _and: [
          { type: { _like: "xp" } },
          { path: { _like: "/oujda/piscine-go/quest-%" } }
        ]
      }) {
        aggregate {
          count
        }
      }
      
      go_exercise: path_aggregate(where: {
        _and: [
          { object: { type: { _like: "exercise" } } },
          { path: { _like: "/oujda/piscine-go/quest-%" } }
        ]
      }) {
        aggregate {
          count
        }
      }}

    `;
export const js = `query {

js_valid_exercise: transaction_aggregate(where: {
  _and: [
    { type: { _like: "xp" } },
    { path: { _like: "/oujda/module/piscine-js/%" } }
  ]
}) {
  aggregate {
    count
  }
}

js_exercise: path_aggregate(where: {
  _and: [
    { object: { type: { _like: "exercise" } } },
    { path: { _like: "/oujda/module/piscine-js/%" } }
  ]
}) {
  aggregate {
    count
  }
}
}
    `;
export const checkpoint = `query {

valid_exercise: transaction_aggregate(
    where: {
      _and: [
        { path: { _like: "/oujda/module/checkpoint%" } },
        { type: { _eq: "xp" } }
      ]
    },
    order_by: { attrs: desc },
    limit: 1
  ) {
    nodes {
      attrs
    }
  }
}
    `;
export const skills = `query {
 user {
        skill_go: transactions_aggregate(where: { type: { _eq: "skill_go" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_sql: transactions_aggregate(where: { type: { _eq: "skill_sql" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_js: transactions_aggregate(where: { type: { _eq: "skill_js" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_html: transactions_aggregate(where: { type: { _eq: "skill_html" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_css: transactions_aggregate(where: { type: { _eq: "skill_css" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
          skill_docker: transactions_aggregate(where: { type: { _eq: "skill_docker" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
            skill_unix: transactions_aggregate(where: { type: { _eq: "skill_unix" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
              skill_prog: transactions_aggregate(where: { type: { _eq: "skill_prog" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_algo: transactions_aggregate(where: { type: { _eq: "skill_algo" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_sys_admin: transactions_aggregate(where: { type: { _eq: "skill_sys-admin" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_front_end: transactions_aggregate(where: { type: { _eq: "skill_front-end" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
            skill_back_end: transactions_aggregate(where: { type: { _eq: "skill_back-end" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
    skill_stats: transactions_aggregate(where: { type: { _eq: "skill_stats" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_ai: transactions_aggregate(where: { type: { _eq: "skill_ai" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_game: transactions_aggregate(where: { type: { _eq: "skill_game" } }) {
          aggregate {
            max {
              amount
            }
          }
        }
        skill_tcp: transactions_aggregate(where: { type: { _eq: "skill_tcp" } }) {
          aggregate {
            max {
              amount
            }
          }
        }

      }
}
    `;

export const moduleFall = `{
      progress_aggregate(
        where: {
          _and: [
            { path: { _like: "/oujda/module/%" } },
            { path: { _nlike: "/oujda/module/checkpoint%" } },
            { path: { _nlike: "/oujda/module/piscine-js/%" } },
            { grade: { _lt: 1 } }  
          ]
        }
      ) {
        aggregate {
          count
        }
      }
    }`;
