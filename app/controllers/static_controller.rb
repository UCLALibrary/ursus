# frozen_string_literal: true
class StaticController < ApplicationController
  def ursus_contact; end

  def ursus_about; end

  def ursus_copyright; end

  def ursus_privacy; end

  def ursus_iiif_guide; end

  def version; end

  def stgall_tei_msdesc
    # Your code to render the specific TEI file
    render template: "static/stgall/#{params[:id]}"
  end
end
