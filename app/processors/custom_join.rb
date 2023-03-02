# frozen_string_literal: true
# Joins values using configured value or linebreak
class CustomJoin < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper

  def render
    if config.separator_options
      next_step(values.map { |x| html_escape(x) })
    else
      joiner = (config.join_with || '<br>'.html_safe)
      next_step(safe_join(values, joiner))
    end
  end

  def html_escape(*args)
    ERB::Util.html_escape(*args)
  end
end
