import {Test, TestingModule} from '@nestjs/testing';
import {ChatService} from './chat.service';
import {ChatRepository} from "../../repositories";
import {MockSignalRepository} from "../../../test/mock/repositories";

describe('ChatService', () => {
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService,
          { provide: ChatRepository, useValue: MockSignalRepository() },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });
});
