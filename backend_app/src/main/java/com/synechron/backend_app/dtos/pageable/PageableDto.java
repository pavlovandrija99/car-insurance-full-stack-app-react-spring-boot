package com.synechron.backend_app.dtos.pageable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class PageableDto {
    private List<Object> objects = new ArrayList<>();
    private int sliceNumber;
    private boolean hasNext;
    private boolean hasPrevious;
    private long totalElements;  // Total amount of elements;
    private int totalNumberOfPages;
}
