# frozen_string_literal: true
# Joins values using configured value or linebreak
class CustomJoin < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper

  def render
    if Flipflop.sinai?
        joiner = config.join_with || ' | '.html_safe
        next_step(safe_join(values, joiner))
    else
      joiner = config.join_with || '<br>'.html_safe
      next_step(safe_join(values, joiner))
    end
  end
end
