// transformLogEntries(logEntries)
// return new array where log entries are transformed based on rules and filters out any that don't meet criteria
// must contain keys: timestamp, level, message, context
// timestamp: ISO 8601 format
// level: (string: 'INFO', 'WARN', 'ERROR')
// message: (string)
// context: { keys: string => value:string } || null

// Transformations:
// convert level values to lowercase
// prefix message with log level in uppercase: e.g. ERROR: Disk space low
// if context then serialize into JSON string and append to the message. e.g., "ERROR: Disk space low - {"disk":"90%"}"
// only include entries with level "WARN" or "ERROR"

// example output
/*
[
  {
    "timestamp": "2024-04-22T15:00:00Z",
    "level": "error",
    "message": "ERROR: Disk space low - {\"disk\":\"90%\"}"
  },
  {
    "timestamp": "2024-04-22T16:00:00Z",
    "level": "warn",
    "message": "WARN: High memory usage"
  }
]
*/

function transformLogEntries(logEntries) {
  const onlyWarnErrorEntries = logEntries.filter(
    (entry) => entry['level'] !== 'WARN' || entry['level'] !== 'ERROR'
  )
  let transformedLogs = []
  // const acceptableKeys = ['timestamp', 'level', 'message', 'context']
  // const keys = Object.keys(logEntry) // add check about the keys later... throw an error if not within contraints...

  for (const entry of logEntries) {
    const logObj = {}
    if (entry.level === 'WARN' || entry.level === 'ERROR') {
      for (const key in entry) {
        if (key === 'timestamp') {
          logObj[key] = entry[key]
        } else if (key === 'level') {
          const newValue = entry[key].toLowerCase()
          logObj[key] = newValue
        } else if (key === 'message') {
          const newMsg = `${entry.level}: ${entry[key]}`
          logObj[key] = newMsg
        } else if (key === 'context') {
          const message = logObj.message
          const newCxt = JSON.stringify(entry[key])
          const newMsg = `${message} - ${newCxt}`
          logObj.message = newMsg
        }
      }
    }
    // for (const logEntry of obj) {
    //   logObj['timestamp'] = logEntry['timestamp']

    //   // let newLevelKey = ''
    //   // console.log(logEntry['level'].toLowerCase())
    //   // const newLevelVal = logEntry['level'].toLowerCase()
    //   logObj['level'] = logEntry['level'].toLowerCase()
    // }
    transformedLogs.push(logObj)
  }
  return transformedLogs
  // console.log(transformedLogs)
}

const logEntries = [
  {
    timestamp: '2024-04-22T14:55:00Z',
    level: 'INFO',
    message: 'User logged in',
  },
  {
    timestamp: '2024-04-22T15:00:00Z',
    level: 'ERROR',
    message: 'Disk space low',
    context: { disk: '90%' },
  },
  {
    timestamp: '2024-04-22T16:00:00Z',
    level: 'WARN',
    message: 'High memory usage',
  },
]
console.log(transformLogEntries(logEntries))
// transformLogEntries(logEntries)
