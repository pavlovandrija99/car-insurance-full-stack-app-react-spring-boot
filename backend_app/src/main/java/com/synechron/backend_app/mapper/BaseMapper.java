package com.synechron.backend_app.mapper;

public interface BaseMapper<Entity, Dto> {

    Dto fromEntityToDto(Entity e);

    Entity fromDtoToEntity(Dto dto);
}
