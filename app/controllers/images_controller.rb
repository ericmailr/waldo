class ImagesController < ApplicationController
    def index
        @target = Target.find_by_name(params[:name]);
        respond_to do |format|
            format.html
            format.json { render :json => @target.to_json }
        end
    end
end
