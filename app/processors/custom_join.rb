# frozen_string_literal: true
# Joins values using configured value or linebreak
class CustomJoin < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper

  def render
    joiner = Flipflop.sinai? ? (config.join_with || '&nbsp;|&nbsp;'.html_safe) : (config.join_with || '<br>'.html_safe)
    next_step(safe_join(values, joiner))
  end
end
