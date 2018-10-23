module DisplayHelper

  def values_with_line_breaks(args)
    safe_join(Array.wrap(args[:value]), '<br />'.html_safe)
  end

end
