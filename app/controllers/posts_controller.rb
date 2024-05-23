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
    post_dom_id = "post_#{ @post.id }" # manually constructing the DOM ID
    post_button_dom_id = "#{post_dom_id}_button"

    respond_to do |format|
      if @post.update(post_params)
        format.turbo_stream {
          render turbo_stream: [
            turbo_stream.replace(post_dom_id, partial: 'posts/post', locals: { post: @post }),
            turbo_stream.replace(post_button_dom_id, partial: 'posts/edit_button', locals: { post: @post })
          ]
        }
        format.html { redirect_to posts_path, notice: 'Post updated successfully.' }
      else
        format.turbo_stream { render turbo_stream: turbo_stream.replace("#{post_dom_id}_edit", partial: 'posts/form', locals: { post: @post }) }
        format.html { render :edit, status: :unprocessable_entity }
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
