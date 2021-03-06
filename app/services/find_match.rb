
class FindMatch
  def self.date(id, _owner, users, _min_time, _max_time, _max_date, _min_date = Date.today)

    # Refresh the events of everybody before looking for match
    a=GoogleRefresh.refresh_all(User.find(_owner), _min_date.rfc3339, (_max_date + 1.day).rfc3339 )

    users.each do |user|
      GoogleRefresh.refresh_all(User.find(user), _min_date.rfc3339, (_max_date + 1.day).rfc3339)
    end

    set_match = Match.find(id)
    users = set_match.user_ids << set_match.owner_id

    # Setting the date period DP of the research
    dp_initial = set_match.min_date || Date.today
    dp_final = set_match.max_date

    # Setting the time period TP of the research
    tp_final = set_match.max_time - 1
    tp_initial = set_match.min_time + 1
    # pour éviter les overlap sur les heures... si fin à 16h et début à 16h, sans ça,
    # on entre dans la config d'overlap !

    occupied = []
    (dp_initial..dp_final).map do |dp|
      count = users.count do |u|
        @timeslot_end = tp_final.change day: dp.day, month: dp.month, year: dp.year
        @timeslot_start = tp_initial.change day: dp.day, month: dp.month, year: dp.year
        User.find(u).user_events.any? do |e|
          event_start = e.start_time
          event_end = e.end_time
          # schedule << [timeslot_start, timeslot_end] if !(event_start..event_end).overlaps?(@timeslot_start..@timeslot_end)
          if (event_start..event_end).overlaps?(@timeslot_start..@timeslot_end)
            occupied << { start: event_start, end: event_end, description: e.summary, user_occ: User.find(u).email }
          end
        end
      end

      nb_attendees = users.size - count

      if nb_attendees == users.size
        {
          title: "✅#{users.size - count}",
          start: @timeslot_start - 1,
          end: @timeslot_end + 1
        }
      elsif nb_attendees > 0 && nb_attendees < users.size
        {
          title: "☑️#{users.size - count}",
          start: @timeslot_start - 1,
          end: @timeslot_end + 1,
        }
      elsif nb_attendees = 0
        {
          title: '',
          start: @timeslot_start - 1,
          end: @timeslot_end + 1
        }
      end
    end
  end
end
