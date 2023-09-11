import {IObjectInitial, IObjectState} from '../objectsTypes';

type SocialEngineeringObjectInitial =
  Omit<IObjectInitial, 'inf_system' | 'work_type' | 'greybox' | 'blackbox' | 'attacker_model'>;

export interface ISocialEngineering extends SocialEngineeringObjectInitial {
  engineering_type?: string[];
  success_criterion: string;
}

export interface ISocialEngineeringState extends IObjectState {
  socialEngineering: ISocialEngineering[];
  allSocialEngineering: ISocialEngineering[];
  socialEngineeringById: ISocialEngineering;
}

export interface ISocialEngineeringErrors {
  success_criterion_error: string;
}

