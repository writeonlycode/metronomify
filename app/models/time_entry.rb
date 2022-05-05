class TimeEntry < ApplicationRecord
  before_validation :ensure_ended_at, :ensure_lasted_for

  validates :ended_at, presence: true
  validates :lasted_for, presence: true

  validates :started_at, comparison: { less_than_or_equal_to: :ended_at }
  validates :ended_at, comparison: { equal_to: proc { |r| r.started_at && r.lasted_for && r.started_at + r.lasted_for }, message: 'must be equal to started at plus lasted for'}

  belongs_to :user

  private

  def ensure_ended_at
    self.ended_at = started_at + lasted_for if ended_at.nil? && started_at.present? && lasted_for.present?
  end

  def ensure_lasted_for
    self.lasted_for = ActiveSupport::Duration.build(ended_at - started_at) if lasted_for.nil? && started_at.present? && ended_at.present?
  end
end
