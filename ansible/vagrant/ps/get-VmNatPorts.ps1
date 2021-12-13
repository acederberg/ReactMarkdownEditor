get-NetTCPConnection `
| where-Object{ $_.OwningProcess -eq 4048 }
