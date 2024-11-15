import _ from "lodash";
import React from "react"
import { CommonType } from "src"
  
  export function RecentSales({data}: any) {
    let uniqueEvents = _(data)
    .sortBy(event => event.status === "accepted" ? 0 : 1)
    .uniqBy('title')
    .value();
    
    return (
      <div className="space-y-8">
        {uniqueEvents.map((item: CommonType) => (
            <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{item.title}</p>
              <p className="text-sm text-muted-foreground">{new Date(item.dueDate!).toLocaleDateString()} - {item.status}</p>
            </div>
            <div className="ml-auto font-medium">{item.amount}</div>
          </div>
        ))}
      </div>
    )
  }