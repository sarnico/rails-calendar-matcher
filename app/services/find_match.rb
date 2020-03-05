class FindMatch
  def self.date (id, owner, users, min_time, max_time, max_date, min_date = Date.today)


    set_match = Match.find(id)

    users = set_match.user_ids << set_match.owner_id


     # Setting the date period DP of the research
    set_match.min_date ? dp_initial = set_match.min_date : dp_initial = Date.today
    dp_final = set_match.max_date

    # Setting the time period TP of the research
    tp_final = set_match.max_time
    tp_initial = set_match.min_time



    schedule = []
    @a = (dp_initial..dp_final).map do |dp|

        count = users.count do |u|

          User.find(u).user_events.any? do |e|
            event_start = e.start_time
            event_end = e.end_time
            @timeslot_end = tp_final.change day: dp.day, month: dp.month, year: dp.year
            @timeslot_start = tp_initial.change day: dp.day, month: dp.month, year:dp.year
            # schedule << [timeslot_start, timeslot_end] if !(event_start..event_end).overlaps?(@timeslot_start..@timeslot_end)
            (event_start..event_end).overlaps?(@timeslot_start..@timeslot_end)
          end

        end

        {
          available: users.size - count,
          min_time: @timeslot_start,
          max_time: @timeslot_end
        }

    end

  end

end





    # set_match = Match.last
    # users = set_match.user_ids << set_match.owner_id


    #  # Setting the date period DP of the research
    # set_match.min_date ? dp_initial = set_match.min_date : dp_initial = Date.today
    # dp_final = set_match.max_date

    # # Setting the time period TP of the research
    # tp_final = set_match.max_time
    # tp_initial = set_match.min_time


    # a = (dp_initial..dp_final).map do |dp|
    #     users.count do |u|
    #       u.user_events.any? do |e|
    #         event_start = e.start_time
    #         event_end = e.end_time
    #         timeslot_end = tp_final.change day: dp.day, month: dp.month, year: dp.year
    #         timeslot_start = tp_initial.change day: dp.day, month: dp.month, year:dp.year
    #         (event_start..event_end).overlaps?(timeslot_start..timeslot_end)
    #           raise
