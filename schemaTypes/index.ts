import {userType} from './user'
import {tagType} from './tag'
import {mediaAsset} from './mediaAsset'
import {portableText} from './portableText'
import {articleType} from './article'
import {articleVersion} from './articleVersion'
import {auditLog} from './auditLog'
import {quiz, quizItem, quizAttempt} from './quiz'
import {organization, classifiedCategory, classifiedListing} from './classifieds' // rename exports in file accordingly
import {page, navNode} from './cms'
import {plan, subscription} from './billing'

export const schemaTypes = [
  userType,
  tagType,
  mediaAsset,
  portableText,
  articleType,
  articleVersion,
  auditLog,
  quiz, 
  quizItem,
  quizAttempt,
  organization,
  classifiedCategory,
  classifiedListing,
  page,
  navNode,
  plan,
  subscription
]
