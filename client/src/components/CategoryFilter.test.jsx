import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter', () => {
  it('toggles selected categories when a checkbox is clicked', () => {
    const onCategoryChange = vi.fn();

    render(
      <CategoryFilter
        categories={['Electronics', 'Apparel']}
        selectedCategories={[]}
        onCategoryChange={onCategoryChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Electronics'));

    expect(onCategoryChange).toHaveBeenCalledWith(['Electronics']);
  });
});
