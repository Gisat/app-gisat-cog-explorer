# Value types parsing

mini arrow fuctions to parse Cog parameter values from URL

### boolean

| **Input**           | **Output**       | **Explanation**                                                                 |
|----------------------|------------------|---------------------------------------------------------------------------------|
| `"true"`            | `true`           | Matches the `"true"` condition.                                                |
| `"false"`           | `false`          | Matches the `"false"` condition.                                               |
| `"True"`            | `true`           | Case-insensitive match for `"true"`.                                           |
| `"FALSE"`           | `false`          | Case-insensitive match for `"false"`.                                          |
| `"random string"`   | `undefined`      | Does not match `"true"` or `"false"`.                                          |
| `"1"`               | `undefined`      | Does not match `"true"` or `"false"`.                                          |
| `""` (empty string) | `undefined`      | Does not match `"true"` or `"false"`.                                          |
| `null`              | `undefined`      | Input is `null`, so it returns `undefined`.                                    |
| `undefined`         | `undefined`      | Input is `undefined`, so it returns `undefined`.                               |

### number

