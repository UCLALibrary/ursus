# frozen_string_literal: true
class StaticController < ApplicationController
  def ursus_contact; end

  def ursus_about; end

  def ursus_copyright; end

  def ursus_privacy; end

  def ursus_iiif_guide; end

  def version; end

  def stgall_tei_msdesc
    encoded_id = CGI.escape(params[:id])
    # puts(params[:id])
    # Your code to render the specific TEI file
    # puts "hello from static controller"+ encoded_id
    if params[:id].match?(/ark(\:|(%3A))(\/|(%2F)).*(\/|(%2F)).*/)
      render template: "static/stgall/#{encoded_id}"
    else
      render template: "static/stgall/#{params[:id]}"
    end
  end
end
