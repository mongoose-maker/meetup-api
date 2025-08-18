export class MeetupService {
  constructor(meetupRepository) {
    this.meetupRepository = meetupRepository;
  }
  async getAllMeetups(options) {
    return this.meetupRepository.getAll(options);
  }
  async getById(id) {
    return this.meetupRepository.getById(id);
  }
  async createMeetup(data) {
    return this.meetupRepository.create(data);
  }
  async updateMeetup(data, id) {
    return this.meetupRepository.update(data, id);
  }
  async deleteMeetup(id) {
    return this.meetupRepository.delete(id);
  }
}
