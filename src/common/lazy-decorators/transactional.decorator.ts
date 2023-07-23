import { createDecorator } from '@toss/nestjs-aop';
import { TRANSACTIONAL } from './transactional.provider';

export const Transactional = () => createDecorator(TRANSACTIONAL);
