export class MeetupService {
  constructor(meetupRepository) {
    this.meetupRepository = meetupRepository;
  }
  async getAllMeetups(options) {
    return this.meetupRepository.getAll(options);
  }
  async getMeetupById(id) {
    return this.meetupRepository.getById(id);
  }
  async createMeetup(data) {
    return this.meetupRepository.create(data);
  }
  async updateMeetup(id, data) {
    return this.meetupRepository.update(id, data);
  }
  async deleteMeetup(id) {
    return this.meetupRepository.remove(id);
  }
}
