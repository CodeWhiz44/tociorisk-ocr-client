# Set the start and end dates for the time frame
start_date="2022-02-01"
end_date="2022-09-30"

# Calculate the number of seconds between start and end dates
start_timestamp=$(date -d "$start_date" +%s)
end_timestamp=$(date -d "$end_date" +%s)
seconds_diff=$((end_timestamp - start_timestamp))

# Loop to create random commits
for ((i=1; i<=103; i++)); do
    # Generate a random number of seconds within the specified time frame
    random_seconds=$((RANDOM % seconds_diff))
    random_timestamp=$((start_timestamp + random_seconds))
    random_date=$(date -d "@$random_timestamp" "+%Y-%m-%d %H:%M:%S")

    # Create an empty commit with a random date
    GIT_COMMITTER_DATE="$random_date" git commit --allow-empty -m "ticket $i"
done
