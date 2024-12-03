import { SetMetadata } from '@nestjs/common';
import { Role } from '@app/libs/models/user/model';

/**
 * Sets the metadata for the roles assigned to the given permissions.
 */
export const Roles = (role: Role) => SetMetadata('role', role);
