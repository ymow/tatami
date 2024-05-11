class PostsController < ApplicationController
  before_action :set_post, only: [:edit, :update]

  def index
    @posts = Post.order(:position)
  end

  def edit
    @post = Post.find(params[:id])
    respond_to do |format|
      format.html { render layout: false }  # If directly accessed via URL
      format.turbo_stream
    end
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to posts_url, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
