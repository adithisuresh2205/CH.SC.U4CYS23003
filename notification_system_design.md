# Stage 1

The Priority Inbox feature is designed to bring the most critical and timely notifications to the user's attention. The requirement is to display the top "n" most important unread notifications, prioritizing by Weight (`Placement` > `Result` > `Event`) and Recency.

## Approach

1.  **Fetching Data**: The system fetches all available notifications from the provided API. In a real-world scenario with vast amounts of data, this step would ideally involve querying the database directly with sorting logic or utilizing an indexing mechanism like Elasticsearch. However, based on the requirements, we process the data in-memory for the top 10.
2.  **Filtering Unread**: It filters the retrieved notifications to include only those that have not been marked as "viewed". The state of "viewed" notifications is maintained locally to fulfill the stateless criteria of this evaluation.
3.  **Scoring and Sorting**:
    *   **Weight**: We assign numerical weights to each notification type: `Placement` = 3, `Result` = 2, `Event` = 1.
    *   **Recency**: We convert the `Timestamp` string into a comparable numerical value (Unix epoch time).
    *   The sorting algorithm first compares the assigned weight of two notifications. If the weights differ, the one with the higher weight is placed first.
    *   If the weights are identical, the algorithm compares their timestamps. The notification with the more recent timestamp is placed first.
4.  **Selection**: After the entire list of unread notifications is sorted according to the criteria above, the system simply takes the first 10 items from the sorted list to display in the Priority Inbox.
5.  **Handling New Notifications**: When new notifications arrive (e.g., via periodic polling), they are appended to the main notification list. The entire list is then re-evaluated through the filtering and sorting pipeline to determine the new top 10.

## Implementation Details

The implementation of this logic can be found in the `notification_app_fe/src/utils/priority.ts` file. It exposes a generic function that takes the raw notifications array and the desired limit 'n', returning the processed priority list.
